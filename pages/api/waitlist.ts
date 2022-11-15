import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;

  res.status(200).json({ email });
};

export default handler;
