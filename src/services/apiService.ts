/**
 * API service for JSONPlaceholder endpoints
 */

import type {
  User,
  Post,
  Comment,
  CreateUserRequest,
  UpdateUserRequest,
  CreatePostRequest,
  UpdatePostRequest,
  CreateCommentRequest,
} from '../types';
import { httpClient } from './httpClient';

export class ApiService {
  // Users endpoints
  async getUsers(): Promise<User[]> {
    return httpClient.get<User[]>('/users');
  }

  async getUser(id: number): Promise<User> {
    return httpClient.get<User>(`/users/${id}`);
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    return httpClient.post<User>('/users', userData);
  }

  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    return httpClient.put<User>(`/users/${id}`, userData);
  }

  async deleteUser(id: number): Promise<void> {
    return httpClient.delete<void>(`/users/${id}`);
  }

  // Posts endpoints
  async getPosts(): Promise<Post[]> {
    return httpClient.get<Post[]>('/posts');
  }

  async getPost(id: number): Promise<Post> {
    return httpClient.get<Post>(`/posts/${id}`);
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return httpClient.get<Post[]>(`/users/${userId}/posts`);
  }

  async createPost(postData: CreatePostRequest): Promise<Post> {
    return httpClient.post<Post>('/posts', postData);
  }

  async updatePost(id: number, postData: UpdatePostRequest): Promise<Post> {
    return httpClient.put<Post>(`/posts/${id}`, postData);
  }

  async deletePost(id: number): Promise<void> {
    return httpClient.delete<void>(`/posts/${id}`);
  }

  // Comments endpoints
  async getComments(): Promise<Comment[]> {
    return httpClient.get<Comment[]>('/comments');
  }

  async getComment(id: number): Promise<Comment> {
    return httpClient.get<Comment>(`/comments/${id}`);
  }

  async getPostComments(postId: number): Promise<Comment[]> {
    return httpClient.get<Comment[]>(`/posts/${postId}/comments`);
  }

  async createComment(commentData: CreateCommentRequest): Promise<Comment> {
    return httpClient.post<Comment>('/comments', commentData);
  }

  async updateComment(id: number, commentData: Partial<CreateCommentRequest>): Promise<Comment> {
    return httpClient.put<Comment>(`/comments/${id}`, commentData);
  }

  async deleteComment(id: number): Promise<void> {
    return httpClient.delete<void>(`/comments/${id}`);
  }
}

// Default API service instance
export const apiService = new ApiService();
