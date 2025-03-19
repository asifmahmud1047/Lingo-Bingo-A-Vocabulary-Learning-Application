import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import japaneseVocabulary from "../utils/japaneseVocabulary";

const LessonDetail = () => {
  const { lessonNo } = useParams();
  const [vocabularies, setVocabularies] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const filteredVocabularies = japaneseVocabulary.filter(
      (word) => word.lesson_no === parseInt(lessonNo)
    );
    setVocabularies(filteredVocabularies);
  }, [lessonNo]);

  const openModal = (word) => {
    setSelectedWord(word);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWord(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 border-green-500";
      case "medium":
        return "bg-yellow-100 border-yellow-500";
      case "difficult":
        return "bg-red-100 border-red-500";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  // Function to play word pronunciation
  const speakWord = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'ja-JP'; // Japanese language
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech!");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Lesson {lessonNo} Vocabulary
      </h1>
      
      {vocabularies.length === 0 ? (
        <p className="text-center text-gray-600">No vocabulary found for this lesson.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vocabularies.map((word) => (
            <div
              key={word.id}
              className={`rounded-lg border-2 p-4 shadow-md ${getDifficultyColor(
                word.difficulty
              )}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold cursor-pointer" onClick={() => speakWord(word.word)}>
                  {word.word}
                </h2>
                <span className="text-sm bg-gray-200 rounded-full px-2 py-1">
                  {word.part_of_speech}
                </span>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">Meaning:</span> {word.meaning}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Pronunciation:</span> {word.pronunciation}
              </p>
              <button
                onClick={() => openModal(word)}
                className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
              >
                When to Say
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/start-learning"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Back to Lessons
        </Link>
      </div>

      {/* Modal for "When to Say" */}
      {isModalOpen && selectedWord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedWord.word}</h2>
            <p className="mb-2">
              <span className="font-semibold">Meaning:</span> {selectedWord.meaning}
            </p>
            <p className="mb-4">
              <span className="font-semibold">When to say:</span> {selectedWord.when_to_say}
            </p>
            <div className="bg-gray-100 p-3 rounded">
              <p className="font-semibold">Example:</p>
              <p>{selectedWord.example}</p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetail; 