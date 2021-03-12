import { deleteSnippet,getSnippetById } from '../../utils/Fauna';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired( async function handler(req, res) {
    const { user } = getSession(req, res);
    const userId=user.sub
    if (req.method !== 'DELETE') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }

    const { id } = req.body;
    const existingRecord = await getSnippetById(id)
    if(!existingRecord || existingRecord.data.userId != userId){
        res.status(404).json({alert:"Not the Owner of the record"})
    }
    try {
        const deletedSnippet = await deleteSnippet(id)
        res.status(200).json(deletedSnippet)
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
})
