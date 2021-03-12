import { updateSnippet,getSnippetById } from '../../utils/Fauna';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
    const { user } = getSession(req, res);
    const userId=user.sub

    if (req.method !== 'PUT') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
    const { id, code, language, description, name } = req.body;
    const existingRecord = await getSnippetById(id)
    if(!existingRecord || existingRecord.data.userId != userId){
        res.status(404).json({alert:"Record not FOUND"})
    }

    try {
        const updated = await updateSnippet(id, code, language, description, name)
        return res.status(200).json(updated)
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
})
