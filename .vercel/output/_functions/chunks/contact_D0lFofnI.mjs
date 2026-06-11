import { Resend } from 'resend';

const prerender = false;
async function POST({ request }) {
  try {
    const { nombre, email, mensaje } = await request.json();
    if (!nombre || !email || !mensaje) {
      return new Response(
        JSON.stringify({ success: false, error: "Faltan campos requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const resend = new Resend("re_3bu8MaXT_66sWsm7uSVze4hH34G91herJ");
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
            `
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
