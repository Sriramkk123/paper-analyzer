/**
 * Validates if a URL is from arxiv.org
 */
export const validateArxivUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    
    // Check if the URL is from arxiv.org
    if (!(urlObj.hostname === 'arxiv.org' || urlObj.hostname.endsWith('.arxiv.org'))) {
      return false
    }
    
    // Check if the URL contains a paper ID
    // ArXiv papers typically have URLs like:
    // https://arxiv.org/abs/2305.12246
    // https://arxiv.org/pdf/2305.12246.pdf
    return (
      urlObj.pathname.includes('/abs/') || 
      urlObj.pathname.includes('/pdf/') ||
      !!urlObj.pathname.match(/\/\d{4}\.\d{5}/)
    )
  } catch (error) {
    // Invalid URL format
    return false
  }
}

/**
 * Extracts the paper ID from an arxiv.org URL
 */
export const extractPaperId = (url: string): string | null => {
  try {
    const urlObj = new URL(url)
    
    // Extract from /abs/ path
    if (urlObj.pathname.includes('/abs/')) {
      const absRegex = /\/abs\/([0-9v.]+)/
      const match = urlObj.pathname.match(absRegex)
      if (match && match[1]) {
        return match[1]
      }
    }
    
    // Extract from /pdf/ path
    if (urlObj.pathname.includes('/pdf/')) {
      const pdfRegex = /\/pdf\/([0-9v.]+)\.pdf/
      const match = urlObj.pathname.match(pdfRegex)
      if (match && match[1]) {
        return match[1]
      }
    }
    
    // Extract from direct pattern like /2101.12345
    const directRegex = /\/(\d{4}\.\d{5})(v\d+)?/
    const directMatch = urlObj.pathname.match(directRegex)
    if (directMatch && directMatch[1]) {
      return directMatch[1] + (directMatch[2] || '')
    }
    
    return null
  } catch (error) {
    return null
  }
}