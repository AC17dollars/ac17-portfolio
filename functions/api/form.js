
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  if (request.method === 'POST') {
    try {
      const formData = await request.formData();
      const data = {};
      for (const entry of formData.entries()) {
        data[entry[0]] = entry[1];
      }

      const sendGridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{
              email: `${env.MY_EMAIL}`
            }]
          }],
          from: {
            email: `${data['email']}`
          },
          subject: data['subject'],
          content: [{
            type: 'text/plain',
            value: `Name: ${data['name']}\nEmail: ${data['email']}\nMessage: ${data['message']}`
          }]
        }),
      });

      if (sendGridResponse.ok) {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        return new Response(JSON.stringify({ success: false, error: 'Failed to send email' }), {
          status: sendGridResponse.status,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } else {
    return new Response('Method Not Allowed', {
      status: 405,
    });
  }
}