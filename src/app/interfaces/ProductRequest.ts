export interface ProductRequest{
    Id?: number;
    Name: string;
    UserId?: number;
    CategoryId: number;
    BrandId: number;
    Price: number;
    Stock: number;
    RegDate?: string;
}