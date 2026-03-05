// Copyright The MatrixHub Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package handler

import (
	"context"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	modelv1alpha1 "github.com/matrixhub-ai/matrixhub/api/go/v1alpha1"
	"github.com/matrixhub-ai/matrixhub/internal/domain/model"
	"github.com/matrixhub-ai/matrixhub/internal/infra/log"
)

type ModelHandler struct {
	ms model.IModelService
}

func NewModelHandler(modelService model.IModelService) IHandler {
	handler := &ModelHandler{
		ms: modelService,
	}
	return handler
}

func (mh *ModelHandler) RegisterToServer(options *ServerOptions) {
	// Register GRPC Handler
	modelv1alpha1.RegisterModelsServer(options.GRPCServer, mh)
	if err := modelv1alpha1.RegisterModelsHandlerServer(context.Background(), options.GatewayMux, mh); err != nil {
		log.Errorf("register model handler error: %s", err.Error())
	}
}

func (mh *ModelHandler) ListModelTaskLabels(ctx context.Context, request *modelv1alpha1.ListModelTaskLabelsRequest) (*modelv1alpha1.ListModelTaskLabelsResponse, error) {
	return nil, status.Error(codes.Unimplemented, "Not implemented")
}

func (mh *ModelHandler) ListModelFrameLabels(ctx context.Context, request *modelv1alpha1.ListModelFrameLabelsRequest) (*modelv1alpha1.ListModelFrameLabelsResponse, error) {
	return nil, status.Error(codes.Unimplemented, "Not implemented")
}

func (mh *ModelHandler) ListModels(ctx context.Context, request *modelv1alpha1.ListModelsRequest) (*modelv1alpha1.ListModelsResponse, error) {
	return nil, status.Error(codes.Unimplemented, "Not implemented")
}

func (mh *ModelHandler) GetModel(ctx context.Context, request *modelv1alpha1.GetModelRequest) (*modelv1alpha1.Model, error) {
	return nil, status.Error(codes.Unimplemented, "Not implemented")
}

func (mh *ModelHandler) CreateModel(ctx context.Context, request *modelv1alpha1.CreateModelRequest) (*modelv1alpha1.CreateModelResponse, error) {
	return nil, status.Error(codes.Unimplemented, "Not implemented")
}

func (mh *ModelHandler) DeleteModel(ctx context.Context, request *modelv1alpha1.DeleteModelRequest) (*modelv1alpha1.DeleteModelResponse, error) {
	return nil, status.Error(codes.Unimplemented, "Not implemented")
}

func (mh *ModelHandler) ListModelRevisions(ctx context.Context, request *modelv1alpha1.ListModelRevisionsRequest) (*modelv1alpha1.ListModelRevisionsResponse, error) {
	return nil, status.Error(codes.Unimplemented, "Not implemented")
}

func (mh *ModelHandler) ListModelCommits(ctx context.Context, request *modelv1alpha1.ListModelCommitsRequest) (*modelv1alpha1.ListModelCommitsResponse, error) {
	return nil, status.Error(codes.Unimplemented, "Not implemented")
}

func (mh *ModelHandler) GetModelCommit(ctx context.Context, request *modelv1alpha1.GetModelCommitRequest) (*modelv1alpha1.Commit, error) {
	return nil, status.Error(codes.Unimplemented, "Not implemented")
}

func (mh *ModelHandler) GetModelTree(ctx context.Context, request *modelv1alpha1.GetModelTreeRequest) (*modelv1alpha1.GetModelTreeResponse, error) {
	return nil, status.Error(codes.Unimplemented, "Not implemented")
}

func (mh *ModelHandler) GetModelBlob(ctx context.Context, request *modelv1alpha1.GetModelBlobRequest) (*modelv1alpha1.GetModelBlobResponse, error) {
	return nil, status.Error(codes.Unimplemented, "Not implemented")
}
