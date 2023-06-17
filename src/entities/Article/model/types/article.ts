export enum ArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT'
}

export interface ArcticleBlockBase {
  id: string
  type: ArticleBlockType
}

export interface ArticleCodeBlock extends ArcticleBlockBase {
  type: ArticleBlockType.CODE
  code: string
}

export interface ArticleImageBlock extends ArcticleBlockBase {
  type: ArticleBlockType.IMAGE
  src: string
  title: string
}

export interface ArticleTextBlock extends ArcticleBlockBase {
  type: ArticleBlockType.TEXT
  paragraphs: string[]
  title?: string
}

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock

export enum ArticleType {
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS'
}

export interface Article {
  id: string
  title: string
  subtitle: string
  img: string
  views: number
  createdAt: string
  type: ArticleType[]
  blocks: ArticleBlock[]
}
