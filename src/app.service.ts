import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { parseString } from 'xml2js'
import {load} from 'cheerio'

export interface post {
  title: string,
  link: string,
  pubDate: string,
  imageSrc: string,
  updatedAt: string,
}

@Injectable()
export class AppService {
  async getPosts(handle: string): Promise<post[]> {
    let response = await axios.get(`https://medium.com/feed/${handle}`)
    let Posts = []
    response = await parseString(response.data, (err, result) => {
      
      const posts = result.rss.channel[0].item.map((item) => {
        const $ = load(item['content:encoded'][0])
        const imageSrc = $('figure img').attr('src')
        const textContent = $.text().slice(0, 150).replace(item.title[0].trim(), '') + '...'
        return {
          title: item.title[0],
          link: item.link[0],
          pubDate: item.pubDate[0],
          imageSrc: imageSrc,
          updatedAt: item['atom:updated'][0],
          shortDescription: textContent
        }
      })

      Posts = posts
    })
    return Posts
  }
}
