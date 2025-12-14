// Replace this with your deployed contract address
export const CONTRACT_ADDRESS = "0xa715780578De22170458cC06bb64dBAAff5025a2"; 
export const SEPOLIA_CHAIN_ID = "0xaa36a7";

export const CONTRACT_ABI = [
  "function createPost(string title, string content, uint256 dueDate) external returns (uint256)",
  "function getPost(uint256 postId) external view returns (tuple(uint256 id, address author, string title, string content, uint256 createdAt, uint256 dueDate, bool isDeleted))",
  "function getAllPosts() external view returns (tuple(uint256 id, address author, string title, string content, uint256 createdAt, uint256 dueDate, bool isDeleted)[])",
  "function addComment(uint256 postId, string content) external returns (uint256)",
  "function getCommentsByPost(uint256 postId) external view returns (tuple(uint256 id, uint256 postId, address author, string content, uint256 createdAt)[])",
  "function reportPost(uint256 postId, string reason) external payable returns (uint256)",
  "function getReportsByPost(uint256 postId) external view returns (tuple(uint256 id, uint256 postId, address reporter, string reason, uint256 createdAt, uint256 amountStaked, uint256 supportVotes, uint256 rejectVotes, bool isResolved)[])",
  "function voteOnReport(uint256 postId, uint256 reportIndex, bool support) external",
  "function resolveReport(uint256 postId, uint256 reportIndex) external",
  "event PostCreated(uint256 indexed postId, address indexed author)",
  "event CommentAdded(uint256 indexed commentId, uint256 indexed postId, address indexed author)",
  "event PostReported(uint256 indexed reportId, uint256 indexed postId, address indexed reporter)",
  "event ReportVoted(uint256 indexed reportId, address indexed voter, bool support)",
  "event ReportResolved(uint256 indexed reportId, bool result)"
];