// /components/donations/types.ts

export interface DonationCampaign {
    id: number
    title: string
    location: string
    description: string
    imageUrl: string
    amountCollected: number
    amountTarget: number
    whatsappLink: string
    status: "active" | "completed" | "closed"
  }