export interface Item {
  id: number;
  name: string;
  description?: string;
  vendorId?: string;
  quantity?: number;
  amount: number;
  fundingAmount?: number;
  platformFee?: number;
  imageUrl?: string;
}
