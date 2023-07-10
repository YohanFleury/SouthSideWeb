import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import colors from '../../config/colors';
import { CustomText } from '../CustomedComponents';

// Assurez-vous de définir l'élément racine de votre application pour l'accessibilité

interface PostCardModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    onReport: () => void;
    onDelete: () => void;
    onSave: () => void;
    coordinateX: any;
    coordinateY: any;
  }

  const PostCardModal = ({ modalVisible, setModalVisible, onReport, onDelete, onSave, coordinateX, coordinateY }: PostCardModalProps) => {
    const handleCloseModal = () => {
        setModalVisible(false);
      }
    return (
    <Modal
        isOpen={modalVisible}
        onRequestClose={handleCloseModal}
        style={customStyles(coordinateX, coordinateY)}
        contentLabel="Example Modal"
    >
      <Container>
        <MenuItem onClick={() => console.log('Signaler')}><CustomText>Signaler</CustomText></MenuItem>
        <MenuItem onClick={() => console.log('Supprimer')}>Supprimer</MenuItem>
        <MenuItem onClick={() => console.log('Ajouter aux signets')}>Ajouter aux signets</MenuItem>
      </Container>
    </Modal>
  );
}

export default PostCardModal;

//Styles pour la modal
const customStyles = (x: number, y: number) => ({
    overlay: {
      backgroundColor: 'transparent',
    },
    content: {
      top: `${y}px`,
      left: `${x}px`,
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: colors.dark.background,
      width: '15    %',  // Pour définir la largeur à 30%.
      border: '1px solid white', // Pour une bordure blanche
      boxShadow: '0 0 10px white', // Pour une ombre blanche
    },
  });

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.div`
  cursor: pointer;
  margin-bottom: 10px;
`;
