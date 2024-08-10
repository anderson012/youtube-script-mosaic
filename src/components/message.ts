function showNotification(options: any) {
  const { title, text, icon, confirmButtonText } = options;

  // Cria um contêiner de fundo
  const backdrop = document.createElement("div");
  backdrop.style.position = "fixed";
  backdrop.style.top = "0";
  backdrop.style.left = "0";
  backdrop.style.width = "100vw";
  backdrop.style.height = "100vh";
  backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
  backdrop.style.display = "flex";
  backdrop.style.justifyContent = "center";
  backdrop.style.alignItems = "center";
  backdrop.style.zIndex = "9999";

  // Cria o contêiner da notificação
  const container = document.createElement("div");
  container.style.backgroundColor = "#fff";
  container.style.borderRadius = "10px";
  container.style.padding = "20px";
  container.style.maxWidth = "400px";
  container.style.boxShadow = "0px 0px 15px rgba(0, 0, 0, 0.3)";
  container.style.textAlign = "center";

  // Título
  const titleElement = document.createElement("h2");
  titleElement.style.marginBottom = "10px";
  titleElement.style.fontSize = "24px";
  titleElement.style.fontWeight = "bold";
  titleElement.textContent = title;

  // Texto
  const textElement = document.createElement("p");
  textElement.style.marginBottom = "20px";
  textElement.textContent = text;

  // Ícone (opcional)
  if (icon) {
    const iconElement = document.createElement("div");
    iconElement.style.fontSize = "40px";
    iconElement.style.marginBottom = "15px";
    iconElement.textContent = icon; // Pode ser um emoji ou HTML de ícone
    container.appendChild(iconElement);
  }

  // Botão de confirmação
  const confirmButton = document.createElement("button");
  confirmButton.textContent = confirmButtonText || "OK";
  confirmButton.style.padding = "10px 20px";
  confirmButton.style.fontSize = "16px";
  confirmButton.style.cursor = "pointer";
  confirmButton.style.backgroundColor = "#3085d6";
  confirmButton.style.color = "#fff";
  confirmButton.style.border = "none";
  confirmButton.style.borderRadius = "5px";
  confirmButton.style.outline = "none";

  // Evento de clique no botão de confirmação
  confirmButton.addEventListener("click", () => {
    document.body.removeChild(backdrop);
  });

  // Monta o conteúdo da notificação
  container.appendChild(titleElement);
  container.appendChild(textElement);
  container.appendChild(confirmButton);
  backdrop.appendChild(container);
  document.body.appendChild(backdrop);
}

// Exemplo de uso
//   showNotification({
//     title: 'Operação Concluída!',
//     text: 'Seu vídeo foi processado com sucesso.',
//     icon: '✅', // Opcional: pode usar emojis ou deixar sem
//     confirmButtonText: 'Fechar'
//   });
