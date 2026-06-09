import { Resend } from "resend";

export const prerender = false;

export async function POST({ request }) {
    try {
        const { nombre, email, mensaje } = await request.json();

        if (!nombre || !email || !mensaje) {
            return new Response(
                JSON.stringify({ success: false, error: "Faltan campos requeridos" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const resend = new Resend(import.meta.env.RESEND_API_KEY);
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

        return new Response(
            JSON.stringify({ success: true, data }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error al mandar correo:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
