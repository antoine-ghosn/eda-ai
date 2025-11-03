const API_BASE_URL = 'http://localhost:8080/api';

export interface ApiUser {
  id: number;
  username: string;
  fullName: string;
  email: string;
  accountType: string;
  avatarUrl?: string;
  instagram?: string;
  tiktok?: string;
  whatsapp?: string;
}

export interface ApiTopic {
  id: number;
  name: string;
  colorFrom: string;
  colorTo: string;
  itemCount: number;
  isFavorite: boolean;
  userId: number;
}

export interface ApiTask {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  category?: string;
  thumbnailUrl?: string;
  userId: number;
  completed: boolean;
}

export interface ApiFeedItem {
  id: number;
  title: string;
  source: string;
  imageUrl: string;
  userId: number;
}

class ApiService {
  async login(username: string, password: string): Promise<ApiUser> {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
  }

  async register(user: Partial<ApiUser> & { password: string }): Promise<ApiUser> {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    return response.json();
  }

  async getUser(userId: number): Promise<ApiUser> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    return response.json();
  }

  async updateUser(userId: number, user: Partial<ApiUser>): Promise<ApiUser> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response.json();
  }

  async getTopics(userId: number): Promise<ApiTopic[]> {
    const response = await fetch(`${API_BASE_URL}/topics/user/${userId}`);
    return response.json();
  }

  async createTopic(topic: Partial<ApiTopic>): Promise<ApiTopic> {
    const response = await fetch(`${API_BASE_URL}/topics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topic),
    });
    return response.json();
  }

  async getTasks(userId: number): Promise<ApiTask[]> {
    const response = await fetch(`${API_BASE_URL}/tasks/user/${userId}`);
    return response.json();
  }

  async getActiveTasks(userId: number): Promise<ApiTask[]> {
    const response = await fetch(`${API_BASE_URL}/tasks/user/${userId}/active`);
    return response.json();
  }

  async getCompletedTasks(userId: number): Promise<ApiTask[]> {
    const response = await fetch(`${API_BASE_URL}/tasks/user/${userId}/completed`);
    return response.json();
  }

  async createTask(task: Partial<ApiTask>): Promise<ApiTask> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  }

  async updateTask(taskId: number, task: Partial<ApiTask>): Promise<ApiTask> {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });
    return response.json();
  }

  async getFeed(userId: number): Promise<ApiFeedItem[]> {
    const response = await fetch(`${API_BASE_URL}/feed/user/${userId}`);
    return response.json();
  }
}

export const apiService = new ApiService();
