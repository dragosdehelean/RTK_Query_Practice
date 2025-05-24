import { EntityState } from '@reduxjs/toolkit';
import { Post } from './postsApi';
import { User } from '../users/usersApi';

export interface PostViewModel {
  id: number;
  title: string;
  userId: number;
  userName: string;
}

export const selectPostViewModels = (
  postsData: EntityState<Post> | undefined,
  usersData: EntityState<User> | undefined
): PostViewModel[] => {
  if (!postsData || !usersData) return [];

  return Object.values(postsData.entities).map(post => ({
    id: post!.id,
    title: post!.title,
    userId: post!.userId,
    userName: usersData.entities[post!.userId]?.name || 'Unknown'
  }));
};