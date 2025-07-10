import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateRoom } from '@/hooks/use-create-room';
import { Button } from './ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from './ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const createRoomSchema = z.object({
    name: z.string().min(3, 'Inclua no mínimo 3 caracteres').max(255),
    description: z.string(),
});

//z.infer = inferir um tipo a partir de um schema
type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
    const createRoomForm = useForm<CreateRoomFormData>({
        resolver: zodResolver(createRoomSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const { mutateAsync: createRoom } = useCreateRoom();

    async function handleCreateRoom(data: CreateRoomFormData) {
        await createRoom(data);

        createRoomForm.reset();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar Sala</CardTitle>
                <CardDescription>
                    Crie uma nova sala de perguntas e respostas com I.A
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={createRoomForm.handleSubmit(handleCreateRoom)}
                    >
                        <FormField
                            control={createRoomForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome da sala</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Digique o nome da sala" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={createRoomForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Digite uma descrição" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" type="submit">
                            Criar sala
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
