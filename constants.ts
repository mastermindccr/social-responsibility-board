// Replace this with your deployed contract address
export const CONTRACT_ADDRESS = "0x3E5c3057f63704Bad6918c6aCAEAEc7b2Fa1eB55"; 
export const SEPOLIA_CHAIN_ID = "0xaa36a7";

export const CONTRACT_ABI = [
  "function createPost(string title, string content, uint256 dueDate) external returns (uint256)",
  "function getPost(uint256 postId) external view returns (tuple(uint256 id, address author, string title, string content, uint256 createdAt, uint256 dueDate, bool isDeleted))",
  "function getAllPosts() external view returns (tuple(uint256 id, address author, string title, string content, uint256 createdAt, uint256 dueDate, bool isDeleted)[])",
  "function addComment(uint256 postId, string content) external returns (uint256)",
  "function getCommentsByPost(uint256 postId) external view returns (tuple(uint256 id, uint256 postId, address author, string content, uint256 createdAt)[])",
  "function reportPost(uint256 postId, string reason) external returns (uint256)",
  "function getReportsByPost(uint256 postId) external view returns (tuple(uint256 id, uint256 postId, address reporter, string reason, uint256 createdAt)[])",
  "event PostCreated(uint256 indexed postId, address indexed author)",
  "event CommentAdded(uint256 indexed commentId, uint256 indexed postId, address indexed author)",
  "event PostReported(uint256 indexed reportId, uint256 indexed postId, address indexed reporter)"
];