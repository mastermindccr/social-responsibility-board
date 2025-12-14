export interface Post {
  id: bigint;
  author: string;
  title: string;
  content: string;
  createdAt: bigint;
  dueDate: bigint;
  isDeleted: boolean;
}

export interface Comment {
  id: bigint;
  postId: bigint;
  author: string;
  content: string;
  createdAt: bigint;
}

export interface Report {
  id: bigint;
  postId: bigint;
  reporter: string;
  reason: string;
  createdAt: bigint;
  amountStaked: bigint;
  supportVotes: bigint;
  rejectVotes: bigint;
  isResolved: boolean;
}

// Global window extension for Ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

declare module "*.png" {
  const src: string;
  export default src;
}
