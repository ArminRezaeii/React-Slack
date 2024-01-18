export interface SidebarOptionProps {
  title: string;
  icon?: React.ElementType;
  addChannelOption?: boolean;
  id?: string;
}

export interface ChatInputProps {
  roomId: string | null;
  channelName: unknown;
  chatRef: React.RefObject<HTMLElement> | null;
}
export interface MessageProps {
  message: string;
  timestamp: any;
  user: string;
  userImage: string;
}
