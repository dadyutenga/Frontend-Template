import { createBrowserRouter } from 'react-router-dom';
import Placeholder from '@/pages/Placeholder';
export const router = createBrowserRouter([{path:'*',element:<Placeholder/>}]);