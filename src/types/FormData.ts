export interface FormData {
  name: string;
  platform: string;
  description: string;
  avatarPreview: string | null;
  avatarFile: File | null;
  isVisibleOnMobile: boolean;
}
