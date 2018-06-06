export interface IParking {
  id: number;
  name: string;
  description?: string;
  distance?: number;
  available?: number;
  lat?: number;
  lng?: number;
  photo?: string;
  shared_by?: string;
  shared_photo?: string;
  shared_phone?: string;
  shared_date?: string;
}
