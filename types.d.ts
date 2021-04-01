export interface IComment {
	id: string;
	postId: number;
	body: string;
}

export interface IPost {
	title: string;
	body: string;
	id?: number;
	comments?: IComment[];
}

export interface IListPosts {
	listPosts: IPost[] | [];
}

export interface IState {
	post: IPost;
	listPosts: IListPosts;
}
