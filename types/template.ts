export interface Template {
    id: string;
    components: {
      type: string;
      initialData?: any; // Optional initial content for components
    }[];
  }