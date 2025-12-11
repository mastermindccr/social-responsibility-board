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
    }

    Post[] public posts;
    mapping(uint256 => Comment[]) public postComments;
    mapping(uint256 => Report[]) public postReports;

    uint256 private _postIds;
    uint256 private _commentIds;
    uint256 private _reportIds;

    event PostCreated(uint256 indexed postId, address indexed author);
    event CommentAdded(uint256 indexed commentId, uint256 indexed postId, address indexed author);
    event PostReported(uint256 indexed reportId, uint256 indexed postId, address indexed reporter);

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

    function reportPost(uint256 postId, string memory reason) external returns (uint256) {
        require(postId > 0 && postId <= posts.length, "Post does not exist");

        _reportIds++;
        uint256 newReportId = _reportIds;

        Report memory newReport = Report({
            id: newReportId,
            postId: postId,
            reporter: msg.sender,
            reason: reason,
            createdAt: block.timestamp
        });

        postReports[postId].push(newReport);

        emit PostReported(newReportId, postId, msg.sender);
        return newReportId;
    }

    function getReportsByPost(uint256 postId) external view returns (Report[] memory) {
        return postReports[postId];
    }
}
