export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json({ name: "John Smith" });
    } else {
        res.status(200).json({ name: "David Smith" });
    }
}
