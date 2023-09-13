from gensim.models import Word2Vec


model = Word2Vec.load("./backend/japanese-word2vec-model-builder/word2vec.gensim.model")

def word_list_up(word_ls, whole_words, top=5):
    readable_word = [word for word in word_ls if model.wv.has_index_for(word)]
    results_words = [word[0] for word in model.wv.most_similar(readable_word ,topn=100) if word[0] not in whole_words]
    return results_words[:top]


def word_is_valid(word):
    return model.wv.has_index_for(word)