import express from "express";
import { Resend } from "resend";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contact", async (req, res) => {
    try {
        const { nombre, email, mensaje } = req.body;

        if (!nombre || !email || !mensaje) {
            return res.status(400).json({
                success: false,
                error: "Faltan campos requeridos",
            });
        }

        const data = await resend.emails.send({
            from: "Contacto <onboarding@resend.dev>",
            to: "scorpionip01010@gmail.com",
            subject: `Nuevo mensaje de: ${nombre}`,
            html: `
                <h2>Nuevo mensaje desde tu sitio web</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
            `,
        });

        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error al mandar correo:", error);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Express en http://localhost:${PORT}`);
});
