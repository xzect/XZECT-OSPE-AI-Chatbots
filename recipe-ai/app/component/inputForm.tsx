import { ChangeEvent, FormEvent, useState } from 'react';
import { Loader2, Send } from 'lucide-react';

const recipePrompts = [
  "How do I make spaghetti carbonara?",
  "What are the ingredients for a chocolate cake?",
  "How do I prepare a Caesar salad?",
  "Can you give me a recipe for a vegan burger?",
  "How to cook a perfect steak?",
  "What is the recipe for a classic margarita pizza?",
  "How to make biryani?",
];

type Props = {
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (prompt: string) => Promise<void>;  // Ensure handleSubmit returns a Promise
  input: string;
  isLoading: boolean;
  stop: () => void;
};

const InputForm = ({ handleInputChange, handleSubmit, input, isLoading, stop }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  const handlePromptClick = async (prompt: string) => {
    setActivePrompt(prompt);
    setError(null);
    try {
      await handleSubmit(prompt);
    } catch (err) {
      console.error('Error handling prompt:', err);
      setError('Failed to process the prompt. Please try again.');
    } finally {
      setActivePrompt(null);
    }
  };

  const isRecipeQuestion = (question: string) => {
    const recipeKeywords = [
      "recipe", "cook", "make", "ingredients", "how to", "prepare", "dish", "meal", "bake", 
      "ingredient", "cooking", "recipe for", "method", "instructions", "dish for", "serve", 
      "food", "cuisine", "recipe guide", "recipe details", "cooking instructions",
      "homemade", "step-by-step recipe", "easy recipe", "quick meal", "cooking tips", 
      "recipe ideas", "meal prep", "dish ideas", "food guide", "cooking method", 
      "how to make", "recipe book", "recipe suggestions", "recipe tips", "delicious recipe", 
      "simple recipe", "healthy recipe", "traditional recipe", "recipe collection", "cooking time", 
      "recipe card", "family recipe", "favorite recipe", "recipe inspiration", "meal ideas",
      
      // Specific recipe questions and prompts
      "How do I make spaghetti carbonara?",
      "What are the ingredients for a chocolate cake?",
      "How do I prepare a Caesar salad?",
      "Can you give me a recipe for a vegan burger?",
      "How to cook a perfect steak?",
      "What is the recipe for a classic margarita pizza?",
      "How to make biryani?",
      "Recipe for homemade lasagna",
      "How to bake a fluffy cake",
      "Ingredients for a classic omelette",
      "How to make creamy mashed potatoes",
      "Recipe for a refreshing smoothie",
      "How to cook a juicy roast chicken",
      "Ingredients for a rich beef stew",
      "How to make the best guacamole",
      "Recipe for a vegan chili",
      "How to bake sourdough bread",
      "Ingredients for a tangy barbecue sauce",
      "How to prepare a savory quiche",
      "Recipe for a classic beef Wellington",
      "How to make a perfect panna cotta"
    ];
    

    return recipeKeywords.some(keyword => question.toLowerCase().includes(keyword));
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === "") {
      setError('Input cannot be empty.');
      return;
    }
    if (!isRecipeQuestion(input)) {
      setError('Please ask a recipe-related question.');
      return;
    }
    setError(null);
    try {
      await handleSubmit(input); // Ensure handleSubmit is awaited
    } catch (err) {
      console.error('Error handling form submission:', err);
      setError('Failed to submit the input. Please try again.');
    }
  };

  return (
    <div>
      {activePrompt === null && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {recipePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePromptClick(prompt)}
              className="cursor-pointer rounded-lg border text-white bg-gray-800 p-4 hover:bg-gray-700 dark:bg-gray-950 dark:hover:bg-gray-900"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleFormSubmit} className="w-full flex flex-row gap-2 items-center h-full mt-5 bg-gray-900">
        <input
          type="text"
          placeholder={isLoading ? 'Generating . . .' : 'Ask a Recipe Question . . .'}
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          className="border-b border-dashed w-full py-2 text-gray-900 placeholder:text-gray-500 focus:placeholder-transparent disabled:bg-transparent rounded-full"
        />
        <button type="submit" className="rounded-full shadow-md border flex items-center justify-center p-2">
          {isLoading ? (
            <Loader2 onClick={stop} className="h-10 w-10 text-red-500 animate-spin" />
          ) : (
            <Send className="h-8 w-8 text-green-500" />
          )}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
