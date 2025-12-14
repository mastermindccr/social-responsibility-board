// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialResponsibilityBoard {
    struct Post {
        uint256 id;
        address author;
        string title;
        string content;
        uint256 createdAt;
        uint256 dueDate;
        bool isDeleted;
    }

    struct Comment {
        uint256 id;
        uint256 postId;
        address author;
        string content;
        uint256 createdAt;
    }

    struct Report {
        uint256 id;
        uint256 postId;
        address reporter;
        string reason;
        uint256 createdAt;
        uint256 amountStaked;
        uint256 supportVotes;
        uint256 rejectVotes;
        bool isResolved;
    }

    Post[] public posts;
    mapping(uint256 => Comment[]) public postComments;
    mapping(uint256 => Report[]) public postReports;
    mapping(uint256 => mapping(address => bool)) public reportVoters;

    uint256 private _postIds;
    uint256 private _commentIds;
    uint256 private _reportIds;
    
    uint256 public constant REPORT_STAKE = 0.00001 ether;
    address public owner;

    event PostCreated(uint256 indexed postId, address indexed author);
    event CommentAdded(uint256 indexed commentId, uint256 indexed postId, address indexed author);
    event PostReported(uint256 indexed reportId, uint256 indexed postId, address indexed reporter);
    event ReportVoted(uint256 indexed reportId, address indexed voter, bool support);
    event ReportResolved(uint256 indexed reportId, bool result);

    constructor() {
        owner = msg.sender;
    }

    function createPost(string memory title, string memory content, uint256 dueDate) external returns (uint256) {
        _postIds++;
        uint256 newPostId = _postIds;

        Post memory newPost = Post({
            id: newPostId,
            author: msg.sender,
            title: title,
            content: content,
            createdAt: block.timestamp,
            dueDate: dueDate,
            isDeleted: false
        });

        posts.push(newPost);

        emit PostCreated(newPostId, msg.sender);
        return newPostId;
    }

    function getPost(uint256 postId) external view returns (Post memory) {
        require(postId > 0 && postId <= posts.length, "Post does not exist");
        return posts[postId - 1];
    }

    function getAllPosts() external view returns (Post[] memory) {
        return posts;
    }

    function addComment(uint256 postId, string memory content) external returns (uint256) {
        require(postId > 0 && postId <= posts.length, "Post does not exist");
        
        Post memory post = posts[postId - 1];
        if (post.dueDate > 0) {
            require(block.timestamp <= post.dueDate, "Post has expired");
        }

        _commentIds++;
        uint256 newCommentId = _commentIds;

        Comment memory newComment = Comment({
            id: newCommentId,
            postId: postId,
            author: msg.sender,
            content: content,
            createdAt: block.timestamp
        });

        postComments[postId].push(newComment);

        emit CommentAdded(newCommentId, postId, msg.sender);
        return newCommentId;
    }

    function getCommentsByPost(uint256 postId) external view returns (Comment[] memory) {
        return postComments[postId];
    }

    function reportPost(uint256 postId, string memory reason) external payable returns (uint256) {
        require(postId > 0 && postId <= posts.length, "Post does not exist");
        require(msg.value >= REPORT_STAKE, "Insufficient stake (0.00001 ETH required)");

        _reportIds++;
        uint256 newReportId = _reportIds;

        Report memory newReport = Report({
            id: newReportId,
            postId: postId,
            reporter: msg.sender,
            reason: reason,
            createdAt: block.timestamp,
            amountStaked: msg.value,
            supportVotes: 0,
            rejectVotes: 0,
            isResolved: false
        });

        postReports[postId].push(newReport);

        emit PostReported(newReportId, postId, msg.sender);
        return newReportId;
    }

    function voteOnReport(uint256 postId, uint256 reportIndex, bool support) external {
        require(postId > 0 && postId <= posts.length, "Post does not exist");
        require(reportIndex < postReports[postId].length, "Report does not exist");
        
        Report storage reportItem = postReports[postId][reportIndex];
        require(!reportItem.isResolved, "Report already resolved");
        require(!reportVoters[reportItem.id][msg.sender], "Already voted");

        reportVoters[reportItem.id][msg.sender] = true;

        if (support) {
            reportItem.supportVotes++;
        } else {
            reportItem.rejectVotes++;
        }

        emit ReportVoted(reportItem.id, msg.sender, support);
    }

    function resolveReport(uint256 postId, uint256 reportIndex) external {
        require(postId > 0 && postId <= posts.length, "Post does not exist");
        require(reportIndex < postReports[postId].length, "Report does not exist");

        Report storage reportItem = postReports[postId][reportIndex];
        require(!reportItem.isResolved, "Report already resolved");
        // Simple logic: if support > reject, post is deleted, reporter gets stake back.
        // if reject >= support, post stays, stake goes to owner (or burned).
        
        reportItem.isResolved = true;
        Post storage post = posts[postId - 1];

        if (reportItem.supportVotes > reportItem.rejectVotes) {
            post.isDeleted = true;
            (bool success, ) = payable(reportItem.reporter).call{value: reportItem.amountStaked}("");
            require(success, "Transfer failed");
            emit ReportResolved(reportItem.id, true); // True = Post Deleted
        } else {
            (bool success, ) = payable(owner).call{value: reportItem.amountStaked}("");
            require(success, "Transfer failed");
            emit ReportResolved(reportItem.id, false); // False = Post Kept
        }
    }

    function getReportsByPost(uint256 postId) external view returns (Report[] memory) {
        return postReports[postId];
    }
}
