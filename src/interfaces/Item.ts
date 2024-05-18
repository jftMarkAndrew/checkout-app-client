export interface Item {
  id: number;
  name: string;
  description?: string;
  vendorId?: string;
  quantity?: number;
  defaultAmount: number;
  fundingAmount?: number;
  platformFee?: number;
  imageUrl?: string;
}
