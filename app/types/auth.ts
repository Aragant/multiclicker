
export interface LoginSuccessResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
}

export interface LoginErrorDetail {
    loc: [string, number];
    msg: string;
    type: string;
}

export interface LoginErrorResponse {
    detail: LoginErrorDetail[];
}

export interface LoginResponse {
    success: boolean;
    message: string;
    user:{ guild_id: string, id: string };
  }
  