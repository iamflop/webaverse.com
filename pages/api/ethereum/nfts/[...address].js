import {
    ApolloClient,
    InMemoryCache,
    gql
  } from "@apollo/client"
import { replaceIpfs, replaceHttp } from '../../../../functions/utils'

export default async function handler(req, res) {
    const { address } = req.query
    const [ userAddress, pageNum ] = address

    const NFTS_PER_PAGE = 20
    const nfts = []
  
    if (address) {
      const client = new ApolloClient({
        uri: `https://api.thegraph.com/subgraphs/name/amxx/eip721-subgraph`,
        cache: new InMemoryCache()
      });
    
      try {
        const nftData = await client
        .query({
          query: gql`
            query getNfts {
              tokens(
                skip: ${pageNum*NFTS_PER_PAGE}, 
                first: ${NFTS_PER_PAGE}, 
                where: {owner: "${userAddress}"}
              ) {
                  uri
              }
            }
          `
        })
      
        const requests = nftData.data.tokens?.map(token => {
          if (token.uri) {
            return fetch(replaceHttp(replaceIpfs(token.uri)))
            .then(res => res.json())
            .then(res => {
              if (res.image || res.image_url || res.animation_url) {
                nfts.push({
                  ...res,
                  image: res.image ? replaceIpfs(res.image) 
                  : 
                    res.image_url ? replaceIpfs(res.image_url)
                    : "",
                  animation_url: res.animation_url ? replaceIpfs(res.animation_url) : ""
                })
              } else {
                console.log(res)
              }
              return
            })
            .catch(err => err);
          } else {
            return;
          }
        })
      
        await Promise.all(requests);
        res.status(200).json(nfts);
      } catch (e) {
        res.status(500).json(e)
      }
    }
  }