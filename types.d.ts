export interface IComment {
	id?: string;
	postId: number;
	body: string;
}

export interface IPost {
	loading?: number;
	error?: Error | null;
	title?: string;
	body?: string;
	id?: number;
	comments?: IComment[];
	removed?: boolean;
}

export interface IListPosts {
	listPosts: IPost[] | [];
	loading: number;
	error: Error | null;
}

export interface IState {
	post: IPost;
	listPosts: IListPosts;
}
