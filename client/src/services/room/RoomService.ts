import { Client } from 'colyseus.js';
import { supabaseB, SESSION_TABLE, PARTICIPANT_TABLE } from '../../lib/supabaseB';
import { authService } from '../auth/AuthService';
import { Quiz } from '../../data/QuizData';

export interface RoomCreationOptions {
    difficulty: string;
    questionCount: number;
    timer: number;
    quiz: Quiz;
}

export class RoomService {
    static async createRoom(client: Client, options: RoomCreationOptions) {
        const { difficulty, questionCount, timer, quiz } = options;

        // MAP CONFIGURATION
        let mapFile = 'map_newest_easy_nomor1.tmj'; // Match GameScene default
        if (difficulty === 'sedang') mapFile = 'map_baru2.tmj';
        if (difficulty === 'sulit') mapFile = 'map_baru3.tmj';

        // ENEMY COUNT CALCULATION
        const enemyCount = questionCount === 5 ? 10 : 20;

        const roomCode = this.generateRoomCode();
        const profile = authService.getStoredProfile();
        const hostId = profile ? profile.id : null;

        // Shuffle and Pick Questions based on settings
        let questions = [...(quiz.questions || [])];
        // Simple shuffle
        questions.sort(() => Math.random() - 0.5);
        // Limit to question count
        questions = questions.slice(0, questionCount);

        // Generate a short alphanumeric session ID (20 chars, lowercase)
        // matching the gameforsmart.com /stat/ URL format (e.g. d85c0w394qbvhkpf1q5g)
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const sessionId = Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const colyseusOptions = {
            roomCode: roomCode,
            sessionId: sessionId,
            difficulty: difficulty,
            subject: quiz.category ? quiz.category.toLowerCase() : "umum",
            quizId: quiz.id,
            quizTitle: quiz.title,
            questions: questions,
            map: mapFile,
            questionCount: questionCount,
            enemyCount: enemyCount,
            timer: timer,
            isHost: true,
            hostId: hostId,
            quizDetail: {
                title: quiz.title,
                category: quiz.category,
                language: quiz.language || 'id',
                description: quiz.description,
                creator_avatar: (quiz as any).creator_avatar || null,
                creator_username: (quiz as any).creator_username || 'kizuko'
            }
        };

        try {
            // We no longer insert to Supabase B from the client.
            // The server's onCreate will handle the initial sync to both Supabase Utama and Supabase B.

            // 2. Create/Join Room on Colyseus
            localStorage.setItem('currentRoomOptions', JSON.stringify(colyseusOptions));
            const room = await client.create("game_room", colyseusOptions); // use create, not joinOrCreate to guarantee host role
            console.log("Room created via RoomService!", room);

            // Save persistent session info for refresh recovery (Colyseus v0.15 API)
            localStorage.setItem('currentRoomId', room.id);
            localStorage.setItem('currentSessionId', room.sessionId);
            localStorage.setItem('currentReconnectionToken', room.reconnectionToken);
            localStorage.setItem('supabaseSessionId', sessionId);

            return { room, options: colyseusOptions };

        } catch (e) {
            console.error("RoomService Flow Error:", e);
            throw e;
        }
    }

    private static generateRoomCode(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}
