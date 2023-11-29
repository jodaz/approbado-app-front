import React from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Post } from '@approbado/lib/types/models'
import { Calendar, MessageSquare } from 'lucide-react-native';
import Text from './Text';
import Row from './Row';

const formattedDate = (date: string) => format(parseISO(date), "dd 'de' MMMM, yyyy", {
    locale: es
});

const PostDescription = ({ post } : Post ) : JSX.Element => (
    <Row size={1} direction='row' align='center'>
        <Calendar color='#6D6D6D' size={20} />
        <Text fontSize={15} color='secondary'>
            {formattedDate(post.created_at)}
        </Text>

        <MessageSquare color='#6D6D6D' size={20} />
        <Text fontSize={15} color='secondary'>
            {post.commentsCount}
        </Text>
    </Row>
)

export default PostDescription;
