import axios from 'axios';

export const api = axios.create({
    baseURL: '/api',
});

export const postAnswer = async (qnId, answer) => {
    const response = await api.post('/checkAnswer', {
        questionId: qnId,
        answer: answer,
        });
    return response.data;
}
