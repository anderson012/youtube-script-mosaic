// =================================================================
// Função para remover todos os filhos de um elemento
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Função para adicionar um player de vídeo ao mosaico
function addVideoToMosaic(videoId, quality) {
  const mosaicContainer = document.getElementById("mosaicContainer");

  const playerContainer = document.createElement("div");
  playerContainer.classList.add("player-container");
  playerContainer.style.position = "relative";
  playerContainer.style.paddingBottom = "56.25%"; // Aspect ratio 16:9
  playerContainer.style.height = "0";
  playerContainer.style.overflow = "hidden";
  playerContainer.style.borderRadius = "10px";

  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&vq=${quality}`;
  iframe.style.position = "absolute";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";

  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.classList.add("remove-button");
  removeButton.style.position = "absolute";
  removeButton.style.top = "40px";
  removeButton.style.right = "10px";
  removeButton.style.display = "none";

  removeButton.addEventListener("click", () => {
    mosaicContainer.removeChild(playerContainer);
    adjustMosaicGrid();
  });

  const dragHandle = document.createElement("button");
  dragHandle.innerText = "≡";
  dragHandle.classList.add("drag-handle");
  dragHandle.style.position = "absolute";
  dragHandle.style.top = "10px";
  dragHandle.style.right = "10px";
  dragHandle.style.cursor = "move";
  dragHandle.style.display = "none";

  const mainToggleButton = document.createElement("button");
  mainToggleButton.innerText = "Set as Main";
  mainToggleButton.classList.add("main-toggle-button");
  mainToggleButton.style.position = "absolute";
  mainToggleButton.style.top = "70px";
  mainToggleButton.style.right = "10px";
  mainToggleButton.style.display = "none";

  mainToggleButton.addEventListener("click", () => {
    if (playerContainer.classList.contains("main-video")) {
      playerContainer.classList.remove("main-video");
      mainToggleButton.innerText = "Set as Main";
    } else {
      const previousMain = document.querySelector(".main-video");
      if (previousMain) {
        previousMain.classList.remove("main-video");
        previousMain.querySelector(".main-toggle-button").innerText =
          "Set as Main";
      }
      playerContainer.classList.add("main-video");
      mainToggleButton.innerText = "Unset as Main";
    }
    adjustMosaicGrid();
  });

  playerContainer.addEventListener("mouseover", () => {
    removeButton.style.display = "block";
    dragHandle.style.display = "block";
    mainToggleButton.style.display = "block";
  });

  playerContainer.addEventListener("mouseout", () => {
    removeButton.style.display = "none";
    dragHandle.style.display = "none";
    mainToggleButton.style.display = "none";
  });

  playerContainer.appendChild(iframe);
  playerContainer.appendChild(removeButton);
  playerContainer.appendChild(dragHandle);
  playerContainer.appendChild(mainToggleButton);
  mosaicContainer.appendChild(playerContainer);

  // Configuração do SortableJS para arrastar e soltar
  adjustMosaicGrid();
}

// Função para ajustar a grade do mosaico
function adjustMosaicGrid() {
  const mosaicContainer = document.getElementById("mosaicContainer");
  const children = Array.from(mosaicContainer.children);
  const mainVideo = document.querySelector(".main-video");
  const columns = parseInt(
    document.getElementById("columnsSelector").value,
    10
  );

  if (mainVideo) {
    mainVideo.style.gridColumn = `span ${columns}`;
    mainVideo.style.zIndex = "10"; // Garantir que o vídeo principal esteja acima
    children.forEach((child) => {
      if (!child.classList.contains("main-video")) {
        child.style.gridColumn = "span 1";
        child.style.zIndex = "1"; // Definir zIndex para outros vídeos
      }
    });
  } else {
    children.forEach((child) => {
      child.style.gridColumn = "span 1";
      child.style.zIndex = "1"; // Definir zIndex para todos os vídeos
    });
  }

  if (children.length <= columns) {
    mosaicContainer.style.gridTemplateColumns = `repeat(${children.length}, 1fr)`;
  } else {
    mosaicContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  }
}

// Função para criar o layout inicial do mosaico e adicionar um campo para novas URLs
function createInitialLayout(videoId, quality) {
  // Remove o conteúdo existente da página
  removeAllChildNodes(document.body);
  document.body.style.overflow = "auto";

  // Cria o contêiner principal
  const mainContainer = document.createElement("div");
  mainContainer.style.display = "flex";
  mainContainer.style.flexDirection = "column";
  mainContainer.style.alignItems = "center";
  mainContainer.style.paddingTop = "20px";
  document.body.appendChild(mainContainer);

  // Cria o campo de entrada e o botão
  const inputContainer = document.createElement("div");
  inputContainer.style.marginBottom = "20px";
  mainContainer.appendChild(inputContainer);

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Enter YouTube URL";
  inputField.style.marginRight = "10px";
  inputContainer.appendChild(inputField);

  const addButton = document.createElement("button");
  addButton.innerText = "Add Video";
  inputContainer.appendChild(addButton);

  const qualitySelector = document.createElement("select");
  addQualityOptions(qualitySelector); // Adicionar opções de qualidade
  qualitySelector.style.marginLeft = "10px";
  qualitySelector.id = "qualitySelector";
  inputContainer.appendChild(qualitySelector);

  const columnsSelector = document.createElement("select");
  addColumnOptions(columnsSelector); // Adicionar opções de colunas
  columnsSelector.style.marginLeft = "10px";
  columnsSelector.id = "columnsSelector";
  inputContainer.appendChild(columnsSelector);

  // Cria o contêiner do mosaico
  const mosaicContainer = document.createElement("div");
  mosaicContainer.id = "mosaicContainer";
  mosaicContainer.style.display = "grid";
  mosaicContainer.style.gridAutoFlow = "row";
  mosaicContainer.style.gap = "10px";
  mosaicContainer.style.width = "100%";
  mosaicContainer.style.padding = "10px";
  mainContainer.appendChild(mosaicContainer);

  // Adiciona o vídeo inicial ao mosaico
  addVideoToMosaic(videoId, quality);

  if (window.Sortable) {
    Sortable.create(mosaicContainer, {
      // handle: '.drag-handle', // Elemento usado para arrastar
      animation: 150, // Animação durante o arrasto
      onEnd: function (evt) {
        // Callback quando o arrasto termina
        console.log(
          "Order changed:",
          evt.from,
          evt.to,
          evt.oldIndex,
          evt.newIndex
        );
      },
    });
  } else {
    console.error("Ops, Sortable not found");
  }

  // Evento de clique para adicionar novos vídeos
  addButton.addEventListener("click", () => {
    const url = inputField.value;
    const newVideoId = getVideoIdFromUrl(url);
    if (newVideoId) {
      addVideoToMosaic(newVideoId, qualitySelector.value);
      inputField.value = "";
    } else {
      alert("Invalid YouTube URL");
    }
  });

  // Evento de mudança de qualidade para todos os vídeos
  qualitySelector.addEventListener("change", () => {
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      const src = new URL(iframe.src);
      src.searchParams.set("vq", qualitySelector.value);
      iframe.src = src.toString();
    });
  });

  // Evento de mudança de colunas
  columnsSelector.addEventListener("change", adjustMosaicGrid);
}

// Função para adicionar opções de qualidade ao seletor
function addQualityOptions(selector) {
  const qualities = [
    "default",
    "small",
    "medium",
    "large",
    "hd720",
    "hd1080",
    "highres",
  ];
  qualities.forEach((quality) => {
    const option = document.createElement("option");
    option.value = quality;
    option.innerText = quality.charAt(0).toUpperCase() + quality.slice(1);
    selector.appendChild(option);
  });
}

// Função para adicionar opções de colunas ao seletor
function addColumnOptions(selector) {
  for (let i = 1; i <= 3; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = `${i} column${i > 1 ? "s" : ""}`;
    selector.appendChild(option);
  }

  selector.value = 2;
}

// Função para obter o ID do vídeo do YouTube a partir da URL
function getVideoIdFromUrl(url) {
  const videoIdMatch = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return videoIdMatch ? videoIdMatch[1] : null;
}

// Função para obter o ID do vídeo atual a partir da URL da página
function getCurrentVideoId() {
  const url = new URL(window.location.href);
  const videoId = url.searchParams.get("v");
  return videoId;
}

// Espera o vídeo carregar antes de criar o layout inicial
const currentVideoId = getCurrentVideoId();
if (currentVideoId) {
  createInitialLayout(currentVideoId, "default");
} else {
  console.error("Current video ID not found.");
}
