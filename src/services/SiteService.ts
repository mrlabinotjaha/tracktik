import axios from 'axios'

const API_URL = 'https://tracktik-challenge.staffr.com/sites'

interface Site {
  id: number
  title: string
  images: string[]
  address: {
    city: string
    country: string
  }
  contacts: {
    main: {
      firstName: string
    }
  }
  tags: string[]
}

export default class SiteService {
  // Fetch all sites
  static async fetchSites(): Promise<Site[]> {
    const response = await axios.get<Site[]>(API_URL)
    return response.data
  }

  // Create a new site
  static async createSite(newSite: Site): Promise<Site> {
    const response = await axios.post<Site>(API_URL, newSite)
    return response.data
  }

  // Delete a site
  static async deleteSite(siteId: number): Promise<void> {
    await axios.delete(`${API_URL}/${siteId}`)
  }
  // Fetch Site with id
  static async getSite(id: string): Promise<Site> {
    const response = await axios.get<Site>(`${API_URL}/${id}`)
    return response.data
  }
}
