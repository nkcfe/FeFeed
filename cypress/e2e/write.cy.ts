describe('글쓰기 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('input[type="email"]').type('nkc9306@gmail.com');
    cy.get('input[type="password"]').type('Rndcjf.01!');
    cy.get('button[type="submit"]').click();
    cy.contains('홈 화면으로').click();
    cy.url().should('include', '/');
    cy.contains('글 작성').click();
    cy.url().should('include', '/write');
  });

  it('글쓰기', () => {
    cy.get('input[placeholder="제목을 입력해주세요"]').type(
      '글쓰기 테스트 제목',
    );
    cy.get('input[placeholder="설명을 입력해주세요"]').type(
      '글쓰기 테스트 설명',
    );
    cy.get('[data-cy="category-input"]').type('Test{enter}');
    cy.get('[data-cy="tag-input"]').type('Test{enter}');
    cy.get('div[contenteditable="true"]').type('글쓰기 테스트 내용');
    cy.contains('저장').click();
    cy.url().should('include', '/posts/');
    cy.contains('삭제').click();
    cy.url().should('include', '/');
  });
});
