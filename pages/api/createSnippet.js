import { createSnippet } from '../../utils/Fauna';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired (async function handler(req, res) {
    const { user } = getSession(req, res);
    console.log(user)
    const {sub:userId,nickname:userName} =user
    const { code, language, description, name } = req.body;
    
    if (req.method !== 'POST') {
        return res.status(405).json({ msg: 'Method not allowed' });
    }
    try {
        const newSnippet = await createSnippet(code, language, description, name,userId,userName)
        return res.status(200).json(newSnippet)
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Something went wrong.' });
    }
})
