import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../utils/api';

/**
 * Custom hook for all admin API calls
 * Centralizes error handling, loading states, and data fetching
 */
export function useAdmin() {
  // ===== DASHBOARD =====
  const fetchDashboard = useCallback(async () => {
    return await apiFetch('/api/admin/dashboard');
  }, []);

  // ===== USERS =====
  const fetchUsers = useCallback(async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.set('page', params.page);
    if (params.limit) query.set('limit', params.limit);
    if (params.search) query.set('search', params.search);
    if (params.role) query.set('role', params.role);
    if (params.isPremium !== undefined && params.isPremium !== '') query.set('isPremium', params.isPremium);
    return await apiFetch(`/api/admin/users?${query.toString()}`);
  }, []);

  const fetchUserDetail = useCallback(async (id) => {
    return await apiFetch(`/api/admin/users/${id}`);
  }, []);

  const updateUser = useCallback(async (id, updates) => {
    return await apiFetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }, []);

  const deleteUser = useCallback(async (id) => {
    return await apiFetch(`/api/admin/users/${id}`, {
      method: 'DELETE',
    });
  }, []);

  // ===== REPORTS =====
  const fetchReports = useCallback(async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.set('page', params.page);
    if (params.limit) query.set('limit', params.limit);
    if (params.status) query.set('status', params.status);
    return await apiFetch(`/api/admin/reports?${query.toString()}`);
  }, []);

  const approveReport = useCallback(async (id, data = {}) => {
    return await apiFetch(`/api/admin/reports/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }, []);

  const rejectReport = useCallback(async (id, reason = '') => {
    return await apiFetch(`/api/admin/reports/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }, []);

  // ===== STORIES =====
  const fetchStories = useCallback(async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.set('page', params.page);
    if (params.limit) query.set('limit', params.limit);
    return await apiFetch(`/api/admin/stories?${query.toString()}`);
  }, []);

  const deleteStory = useCallback(async (id) => {
    return await apiFetch(`/api/admin/stories/${id}`, {
      method: 'DELETE',
    });
  }, []);

  // ===== PAYMENTS =====
  const fetchPayments = useCallback(async (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.set('page', params.page);
    if (params.limit) query.set('limit', params.limit);
    if (params.status) query.set('status', params.status);
    return await apiFetch(`/api/admin/payments?${query.toString()}`);
  }, []);

  // ===== SETTINGS =====
  const fetchSettings = useCallback(async () => {
    return await apiFetch('/api/admin/settings');
  }, []);

  return {
    fetchDashboard,
    fetchUsers,
    fetchUserDetail,
    updateUser,
    deleteUser,
    fetchReports,
    approveReport,
    rejectReport,
    fetchStories,
    deleteStory,
    fetchPayments,
    fetchSettings,
  };
}

export default useAdmin;
