import os
import sys

def rename_images_sequentially(folder_path, extensions=[".png", ".gif", ".jpg", ".jpeg"]):
    """
    Renomeia todas as imagens em uma pasta com números sequenciais.

    Args:
        folder_path (str): O caminho para a pasta contendo as imagens.
        extensions (list): Lista de extensões de arquivo a serem processadas.
    """
    # Converte o caminho para absoluto
    folder_path = os.path.abspath(folder_path)
    print(f"Processando pasta: {folder_path}")

    if not os.path.isdir(folder_path):
        print(f"Erro: A pasta '{folder_path}' não existe.")
        return

    # Lista todos os arquivos na pasta
    files = os.listdir(folder_path)
    print(f"Total de arquivos encontrados: {len(files)}")

    # Filtra apenas os arquivos que terminam com as extensões especificadas
    image_files = []
    for ext in extensions:
        matching_files = [f for f in files if f.lower().endswith(ext.lower())]
        print(f"Arquivos com extensão {ext}: {len(matching_files)}")
        image_files.extend(matching_files)
    
    # Ordena os arquivos para garantir uma numeração consistente
    image_files.sort()
    print(f"Total de imagens a serem renomeadas: {len(image_files)}")

    if not image_files:
        print(f"Nenhuma imagem encontrada na pasta '{folder_path}'.")
        return

    # Primeiro, renomeia para nomes temporários para evitar conflitos
    temp_names = []
    for i, old_name in enumerate(image_files):
        temp_name = f"temp_{i:03d}{os.path.splitext(old_name)[1].lower()}"
        old_path = os.path.join(folder_path, old_name)
        temp_path = os.path.join(folder_path, temp_name)
        try:
            os.rename(old_path, temp_path)
            temp_names.append((temp_name, os.path.splitext(old_name)[1].lower()))
            print(f"Renomeado temporariamente: {old_name} -> {temp_name}")
        except OSError as e:
            print(f"Erro ao renomear '{old_name}': {e}")

    # Agora renomeia para os nomes finais
    for i, (temp_name, ext) in enumerate(temp_names):
        new_name = f"foto_{i + 1:03d}{ext}"
        temp_path = os.path.join(folder_path, temp_name)
        new_path = os.path.join(folder_path, new_name)
        try:
            os.rename(temp_path, new_path)
            print(f"Renomeado para: {new_name}")
        except OSError as e:
            print(f"Erro ao renomear '{temp_name}': {e}")

    print("Renomeação concluída!")

if __name__ == "__main__":
    # Caminho para a pasta de fotos
    my_photos_folder = "fotos"
    print(f"Script executado de: {os.path.abspath(__file__)}")
    
    # Lista de extensões de arquivo a serem processadas
    image_extensions = [".png", ".gif", ".jpg", ".jpeg"]
    
    rename_images_sequentially(my_photos_folder, image_extensions)