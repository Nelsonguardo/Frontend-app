import axios from 'axios';

const API_BASE_URL = 'http://46.202.88.87:8010/usuarios/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

interface LoginResponse {
    access: string;
    refresh: string;
    [key: string]: any;
}

// Función para login de usuario
export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post('/login/', { username, password });
    return response.data;
};

// Función para obtener el perfil del usuario
export const getUserProfile = async (accessToken: string): Promise<any> => {
    const response = await apiClient.get('/perfil/', {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response);
    return response.data;
};

// Función para editar el perfil del usuario
export const editUserProfile = async (accessToken: string, profileData: any): Promise<any> => {
    const response = await apiClient.put('/usuario/perfil/', profileData, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
};

// Función para subir la foto del perfil
export const uploadProfilePhoto = async (accessToken: string, file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('foto', file);
    const response = await apiClient.patch('/perfil/foto/', formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};