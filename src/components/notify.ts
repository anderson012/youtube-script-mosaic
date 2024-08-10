// Cria um contêiner global para notificações
const notificationStackContainer = document.createElement("div");
notificationStackContainer.style.position = "fixed";
notificationStackContainer.style.top = "20px";
notificationStackContainer.style.right = "20px";
notificationStackContainer.style.zIndex = "9999";
notificationStackContainer.style.display = "flex";
notificationStackContainer.style.flexDirection = "column";
notificationStackContainer.style.gap = "10px";
document.body.appendChild(notificationStackContainer);

export function showNotification(options: any) {
  const { title, text, icon, duration = 3000, variant = "default" } = options;

  // Cria o contêiner da notificação
  const notificationContainer = document.createElement("div");
  notificationContainer.style.backgroundColor = getBackgroundColor(variant);
  notificationContainer.style.color = "#fff";
  notificationContainer.style.borderRadius = "5px";
  notificationContainer.style.padding = "15px";
  notificationContainer.style.boxShadow = "0px 0px 15px rgba(0, 0, 0, 0.3)";
  notificationContainer.style.display = "flex";
  notificationContainer.style.alignItems = "center";
  notificationContainer.style.gap = "10px";
  notificationContainer.style.cursor = "pointer";
  notificationContainer.style.animation = "fadein 0.5s";

  // Ícone (opcional)
  if (icon) {
    const iconElement = document.createElement("div");
    iconElement.style.fontSize = "24px";
    iconElement.textContent = icon; // Pode ser um emoji ou HTML de ícone
    notificationContainer.appendChild(iconElement);
  }

  // Texto da notificação
  const textContainer = document.createElement("div");
  const titleElement = document.createElement("h4");
  titleElement.style.margin = "0 0 5px 0";
  titleElement.style.fontSize = "16px";
  titleElement.style.fontWeight = "bold";
  titleElement.textContent = title;

  const textElement = document.createElement("p");
  textElement.style.margin = "0";
  textElement.style.fontSize = "14px";
  textElement.textContent = text;

  textContainer.appendChild(titleElement);
  textContainer.appendChild(textElement);
  notificationContainer.appendChild(textContainer);

  // Adiciona a notificação ao contêiner global
  notificationStackContainer.appendChild(notificationContainer);

  // Evento de clique para remover a notificação
  notificationContainer.addEventListener("click", () => {
    removeNotification(notificationContainer);
  });

  // Remove a notificação após o tempo definido
  setTimeout(() => {
    removeNotification(notificationContainer);
  }, duration);
}

// Função para remover a notificação com animação
export function removeNotification(notification: HTMLElement) {
  notification.style.animation = "fadeout 0.5s";
  notification.addEventListener("animationend", () => {
    notificationStackContainer.removeChild(notification);
  });
}

// Função para definir a cor de fundo baseado no tipo de notificação
function getBackgroundColor(variant: string) {
  switch (variant) {
    case "success":
      return "#4caf50";
    case "error":
      return "#f44336";
    case "warning":
      return "#ff9800";
    case "info":
      return "#2196f3";
    default:
      return "#333";
  }
}

// Animações para fade in e fade out
const style = document.createElement("style");
style.textContent = `
  @keyframes fadein {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeout {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }
`;
document.head.appendChild(style);

// Exemplo de uso
// showNotification({
//   title: 'Sucesso!',
//   text: 'A operação foi concluída com êxito.',
//   icon: '✅',
//   variant: 'success',
//   duration: 4000
// });

// showNotification({
//   title: 'Erro!',
//   text: 'Ocorreu um problema.',
//   icon: '❌',
//   variant: 'error',
//   duration: 4000
// });
