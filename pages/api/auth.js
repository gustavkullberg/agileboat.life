import axios from 'axios';
import * as jwt from 'jsonwebtoken';

const captainEmails = ["gustav_kullberg@hotmail.com", "max.mjornell@gmail.com"];

export default async (req, res) => {
  if (req.query.loginType === 'facebook') {
    const { faceBookToken, facebookProfilePicture } = req.query;
    if (!faceBookToken) {
      res.statusCode = 400;
      res.json({ status: 'Bad Request' });
    }
    const url =
      `https://graph.facebook.com/oauth/access_token?client_id=485962199031939&client_secret=${process.env.FB_CLIENT_SECRET}&grant_type=client_credentials`;

    const { data } = await axios
      .get(url)
      .then(res =>
        axios.get(
          `https://graph.facebook.com/debug_token?input_token=${faceBookToken}&access_token=${res.data.access_token}`
        )
      );
    const { is_valid, user_id } = data.data;

    if (is_valid) {
      res.statusCode = 200;
      const { data } = await axios.get(
        `https://graph.facebook.com/${user_id}?fields=id,name,email&access_token=${faceBookToken}`
      );
      console.log(data)
        const roles = [];
        if(captainEmails.includes(data.email.toLowerCase())) roles.push("captain")
        const accessToken = jwt.sign({ name: data.name, id: user_id, email:data.email.toLowerCase(), roles }, process.env.JWT_SECRET ??"lolsecret", { expiresIn: 60 * 60 * 24 }); //1d
        
      return res.json({ accessToken });
    } else {
      res.statusCode = 400;
      return res.json({ status: 'Bad Request' });
    }
  }
};
