import axios from 'axios'
import { PaperData } from '../types/paper'

/**
 * Fetches paper data from arXiv API
 */
export const fetchPaperData = async (paperId: string): Promise<PaperData> => {
  const url = `https://export.arxiv.org/api/query?search_query=id:${paperId}&max_results=1`
  const response = await axios.get<string>(url, { responseType: 'text' })
  const xml = response.data
  const doc = new DOMParser().parseFromString(xml, 'application/xml')
  const entry = doc.getElementsByTagName('entry')[0]
  if (!entry) throw new Error(`No data found for paper ${paperId}`)
  const getText = (tag: string) => entry.getElementsByTagName(tag)[0]?.textContent?.trim() ?? ''
  const authors = Array.from(entry.getElementsByTagName('author')).map(authorEl => ({
    name: authorEl.getElementsByTagName('name')[0]?.textContent?.trim() ?? '',
    affiliation: authorEl.getElementsByTagName('arxiv:affiliation')[0]?.textContent?.trim() ?? ''
  }))
  return {
    id: paperId,
    title: getText('title'),
    publicationDate: getText('published'),
    authors,
    abstract: getText('summary'),
    fullText: getText('summary'),
    rawXml: xml
  }
}