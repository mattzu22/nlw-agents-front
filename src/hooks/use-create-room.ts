import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateRoomRequest } from '@/interfaces/create-room-request';
import type { CreateRoomResponse } from '@/interfaces/create-room-response';

export function useCreateRoom() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateRoomRequest) => {
            const response = await fetch('http://localhost:3333/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result: CreateRoomResponse = await response.json();

            return result;
        },

        onSuccess: () => {
            //invalidateQuesries = vai refazer automaticamente todas as queries informadas que estão em tela
            queryClient.invalidateQueries({ queryKey: ['get-rooms'] });
        },
    });
}
